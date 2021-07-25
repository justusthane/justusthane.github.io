---
title: Writing a PowerShell module with separate .ps1 files for each cmdlet
date: 2021-07-24
---
Writing a PowerShell module is very easy. Basically, just create a directory under `~\Documents\WindowsPowerShell\modules` and create a .psm1 file with the same name inside that directory. Any functions that you put in that .psm1 file become cmdlets that you can call in any PowerShell session.

However, you may prefer to split your functions up into different files rather than putting them all into one giant .psm1 file. 

If you Google around, there are various solutions. One way to do it is to be to create additional .ps1 files for each cmdlet, and then loop through and dot-source them from within your .psm1 file. This works, but it is the wrong way to do it. The main disadvantage is that your cmdlets are no longer automatically discoverable by PowerShell.

Beginning in PowerShell 3.0, you don't have to `Import-Module` a module before using the cmdlets in it. You can just enter the cmdlet, and PowerShell is smart enough to import the module belongs to on its own. This doesn't work if you use the dot-sourcing method above.

The correct solution is to create a separate .ps1 file for each cmdlet in your module directory (as above), but then use a manifest file to list them rather than dot-sourcing.

### How-to

This is easiest to demonstrate by creating a new module, but you can adapt an existing module just as easily.

1. Create a new directory for your module in ~\Documents\WindowsPowerShell\modules. We'll call ours "My-Module".
2. Create a file called "My-Module.psm1" in the "My-Module" directory. This file must exist, but it can be empty. I like to put smaller "helper" functions that my other cmdlets depend on inside it.
3. Create as many new .ps1 files inside the "My-Module" directory as you need. Any functions inside any of these .ps1 files will become cmdlets. You may prefer to create a .ps1 file for each cmdlet, or create a .ps1 file for a related group of cmdlets. It's up to you.
4. Generate a manifest file for your module by running the following PowerShell command (ensure that you give the manifest file the same name as your module):
  ```powershell
  New-ModuleManifest -Path ~\Documents\WindowsPowerShell\modules\My-Module.psd1 -ModuleVersion "2.0" -Author "Brad Pitt"
  ```
5. Edit the resulting .psd1 file and make the following changes:
  - Uncomment the "NestedModules" line and list each of your .ps1 files as an array. E.g.:
    ```powershell
    # Modules to import as nested modules of the module specified in RootModule/ModuleToProcess
    NestedModules = @("Get-IPInfo.ps1","Remove-Emails.ps1","Build-VMRDPConnections.ps1","Find-ADUser.ps1","O365Migration.ps1")
    ```
  - Change the "FunctionsToExport" line to `FunctionsToExport = '*'` Alternatively, if you prefer, you can specify each function (cmdlet) here individually, which Microsoft recommends for performance.
6. Done! Open a new PowerShell session, and you should be able to call any of your new cmdlets.

*Note*: Any changes you make to your .ps1 files will not take effect until you either open a new PowerShell, or run `Import-Module My-Module -Force`
