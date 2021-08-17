---
title: How to convert an Office365 mailbox to Shared in a hybrid Exchange environment
date: 2021-08-17
---
In a hybrid Exchange environment, if you convert a mailbox to shared using the Exchange Online Admin Center, the AD attributes that designate the account as shared won't be replicated back to local AD. Because of this, the next time a sync occurs the Office365 mailbox will be converted back to a regular mailbox.

The solution is to manually update the local AD attributes after converting the mailbox to shared.

1. Log into [Exchange Online Admin Center](https://outlook.office365.com/ecp), go to **recipients**, and select the mailbox to be converted.
2. In the menu on the right, under "Convert to Shared Mailbox", click **Convert**
3. Run the following PowerShell command on a domain controller (or on a workstation with Active Directory Users and Computers installed):
```powershell
Set-ADUser <USERNAME> -Replace @{msExchRemoteRecipientType=100;msExchRecipientTypeDetails=34359738368}
```
