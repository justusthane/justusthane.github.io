---
title: Configuring Graylog TLS with LetsEncrypt
date: 2026-11-18
updated: 2026-11-18
---
This guide is based on the official [Graylog documentation for configuring TLS](https://go2docs.graylog.org/current/setting_up_graylog/secure_graylog_interface_with_tls.htm), adjusted for LetsEncrypt (as well as an additional step, not mentioned in the docs, which will break your Graylog if you don't do it). The Graylog TLS configuration is one of the most convoluted I've seen.

# Prerequisites
- Graylog is installed and configured (tested on version 7.2.0)
- certbot is installed
- You're familiar with the various ACME challenges (http-01, dns-01) and you know how to make one work. That is beyond the scope of this guide.

1. Log into your server as root
2. chmod the certbot directory where certs are kept so that the graylog user can read them:
    `chmod 0755 /etc/letsencrypt/{live,archive}`
    > [!note]
    > This will make certbot certificates, and their private keys, readable to any user on the system.
    > This is a recommended configuration by certbot: https://eff-certbot.readthedocs.io/en/stable/using.html#where-are-my-certificates
3. Generate a passphrase for the private key and save it to a file:
    ```bash
    echo $(tr -dc 'A-Za-km-z0-9\_\-.,+=@%' </dev/urandom | head -c 24) > /root/graylog_keypass
    ```
    You may choose to save this file elsewhere/
4. Request a certificate from certbot:
    Replace `<GRAYLOG FQDN>` with the FQDN of your server
    ``bash
    FQDN=<GRAYLOG FQDN>
    certbot certonly -d <GRAYLOG FQDN> --deploy-hook "openssl pkcs8 -in /etc/letsencrypt/live/$FQDN/privkey.pem -topk8 -out /etc/letsencrypt/live/$FQDN/privkey.pkcs8.pem -passout 'file:/root/graylog_keypass' && chmod 755 /etc/letsencrypt/live/$FQDN/privkey.pkcs8.pem && systemctl restart graylog-server
    # Make sure to update the file referenced in the `-passout` argument if you saved the passphrase elsewhere.
    ```
    > [!note]
    > Graylog requires the private key to be an encrypted PKCS#8 file, but certbot outputs an unencrypted key. This deploy hook converts the key and restarts Graylog.
5. Make the following changes to `/etc/graylog/server/server.conf`:
    ```
    http_publish_uri = <GRAYLOG FQDN>:9000/
    http_external_uri = <GRAYLOG FQDN>:9000/
    # The above two settings aren't mentioned in Graylog's guide for configuring TLS, but they are necessary so that Graylog communicates with itself using the hostname rather than the IP address.
    # If you don't do this, you'll get errors like 
    http_enable_tls = true
    http_tls_cert_file = /etc/letsencrypt/live/<GRAYLOG FQDN>/fullchain.pem
    http_tls_key_file = /etc/letsencrypt/live/<GRAYLOG FQDN>/privkey.pkcs8.pem
    http_tls_key_password = <passphrase for the private key (no quotes)
    # Get it with cat /root/graylog_pass (or whever you saved it) if you need it
    ```
6. Restart Graylog: `systemctl restart graylog-server`
