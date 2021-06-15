---
title: How to migrate an Office365 mailbox to on-premises in an Exchange hybrid environment
date: 2021-06-15
---
# The issue
If you're running a hybrid Exchange environment, you might have the need to migrate a mailbox from Office365 to on-prem. If the mailbox previously existed on-prem and was at some point migrated to O365 and now you need to migrate it back, it will work as you expected. However, if the mailbox never existed on-prem, your migration will fail with the error 

`Cannot find a recipient that has mailbox GUID '70ce6b6f-8c28-4ebe-a92e-4f4dc85efa94'`

This is because Office365 matches Exchange Online mailboxes with their corresponding AD users by using the `msExchMailboxGuid` attribute in Active Directory and the `ExchangeGuid` attribute in Exchange Online/Office365/AzureAD/whatever you want to call it. AD Connect replicates this attribute *from* AD *to* Exchange Online, but not the other way around. Thus, if the mailbox has never existed on-prem, the corresponding AD account will have no msExchMailboxGuid attribute, and the migration will fail.

Verifying that our user in question has no msExchMailboxGuid:
```powershell
 get-aduser jim.bob -Properties * | ft name,msexchmailboxguid

 name    msexchmailboxguid
 ------- -----------------
 jim.bob
 ```

# The solution
The solution is to manually set the mxExchMailboxGuid attribute on the user in AD to match their ExchangeGuid attribute from Exchange Online.

**If you want a one-liner to do this quick and easily, use the following:**
```powershell
Import-Module ActiveDirectory
Import-Module ExchangeOnlineManagement
Connect-ExchangeOnline
set-aduser jim.bob -Replace @{msExchMailboxGuid=$([System.Guid]$(get-mailbox jim.bob).ExchangeGuid).ToByteArray()}
```
After running the above, you should be able to rerun your migration successfully.

**If you want to understand how it works and follow along step-by-step, carry on.**

First we'll get the correct GUID for the mailbox from ExchangeOnline:
```powershell
import-module ExchangeOnlineManagement
connect-exchangeonline
get-mailbox jim.bob | fl identity,exchangeguid


Identity     : jim.bob
ExchangeGuid : 70ce6b6f-8c28-4ebe-a92e-4f4dc85efa94


```

Now we know what our GUID needs to be, we have to apply it to our Active Directory user. However, AD stores the GUID as a byte array rather than a string. We can see this if we look at the msExchMailboxGuid attribute for another AD user who is either on-prem or used to be on-prem:

```powershell
 get-aduser jim.bob -Properties * | ft name,msexchmailboxguid

 name        msexchmailboxguid
 -------     -----------------
 jim.bob     {90, 184, 80, 247...}
```

If we were to try applying the GUID to the AD user as a string, we'd get the following error:
```powershell
set-aduser jim.bob -Replace @{msExchMailboxGuid="f750b85a-ebae-48ec-9add-2224df22000a"}
set-aduser : A value for the attribute was not in the acceptable range of values
At line:1 char:1
+ set-aduser jim.bob -Replace @{msExchMailboxGuid="f750b85a-ebae-48ec- ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (jim.bob:ADUser) [Set-ADUser], ADException
        + FullyQualifiedErrorId : ActiveDirectoryServer:8322,Microsoft.ActiveDirectory.Management.Commands.SetADUser
```

So, we need to convert the GUID that we got from our ExchangeOnline mailbox to a byte array before we can apply it to our AD user:

```powershell
# This creates a new GUID object. Of course change the GUID below to your GUID.
$guid = [System.Guid]"70ce6b6f-8c28-4ebe-a92e-4f4dc85efa94"

# And now we'll use a built-in method of the GUID object to convert it to a byte array
$guid = $guid.ToByteArray()

# If we look at the $guid variable now, we'll see that it's been converted:
$guid
111
107
206
112
40
140
190
78
169
46
79
77
200
94
250
148
```

Finally, all we have to do is save that byte array to the msExchMailboxGuid attribute of your AD user:
```powershell
set-aduser jim.bob -Replace @{msExchMailboxGuid=$guid}
```

If you look at the attribute now, you should see that it's been set:
```powershell
get-aduser jim.bob -Properties * | ft name,msexchmailboxguid

name     msexchmailboxguid
----     -----------------
jim.bob {111, 107, 206, 112...}
```

And if we convert the attribute back to a string, it should return the same string that you got from the Exchange Online mailbox:
```powershell
$([System.Guid]$(get-aduser jim.bob -prop *).msExchMailboxGuid).ToString()
70ce6b6f-8c28-4ebe-a92e-4f4dc85efa94
```

Now you should be able to re-run your migration successfully!

# Comments
Questions? Comments? Was this helpful to you? [Let me know](mailto:jg@justus.ws)!
