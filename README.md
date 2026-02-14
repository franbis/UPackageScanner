# UPackageScanner

**UPackageScanner** is a *static web app* to scan Unreal Engine (1-3) packages for dangerous or suspicious content, such as embedded DLLs.

You can use the **app** on here 👉 [demo](https://franbis.github.io/UPackageScanner/).

For more information about malicious packages, here's the [Overview](/public/info/Overview.md).


## Why is it needed?

Most of the Unreal Engine (1-3) gaming community tends to ignore the dangers of malicious packages, yet these are not exempt from containing malwares.
Malicious packages exploit the permissions the game software has to do things that are beyond the game's scope, and they do it as soon as the engine loads one.


## What can it find?

It scans a package for *classes*, *functions* and *variables* that are often used by hackers to perform various *attacks* on *servers* and *clients*.

* **Embedded files** - Files that have been embedded in the package and that UnrealScript can extract and run, such as DLLs and executables
* **File readers** - UnrealScript code that can read any file present in your computer
* **File writers & deleters** - UnrealScript code that can write and delete files in your computer
* **File executing** - UnrealScript code that can execute files present in your computer
* **Console readers** - UnrealScript code that can read the content of the game console, which may eventually be sent to a third party
* **Information sending - UnrealScript code that can read data from your computer and files, and send it to third party
* **Game controlling** - UnrealScript code that can take over the game software, either temporarily (until you reboot the game) or permanently (until you reinstall the game)
* **Dialogs opening** - UnrealScript code that can open dialogs on external windows
* **Browser opening** - UnrealScript code that can open the default browser to specific URLs


## Build instructions

- Install *Node.js*
- Run `npm ci`
- Run `npm run build`