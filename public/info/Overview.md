# What you should know about UE packages

*Unreal Engine (1-3)* **packages are archives**, these include *`.u` files, map files, texture packs* and so on.

What you may not know is that these archives can, through a *simple exploit*, **store literally anything**, including data that has nothing to do with the game, such as *viruses*.
<br>
Knowledge of `Unreal Script` alone is enough to embed, extract and run files on any device that loads the package.

## Who's in danger?

Anyone who lets the engine load these packages, **pretty much everyone in the community**.
<br>
A malicious package can **gain full access to the device** it is loaded on, this can be a **server** or a **client** machine.

## What kind of packages?

Most packages are interchangable, the filename *extension* doesn't matter, it's sole purpose is to describe the content of the package. In the end, they are all the same thing: `.unr`, `.utx`, `.umx` and so on, they all can contain and run code.

## Since when?

Initially, the native side (`c++`, etc) of *Unreal Engine* wasn't *open-source*, it was licensed to game developers under payment, unlike *scripts* developed through the *scripting language* (*Unreal Script*).
<br>
By that time, most exploits were found through **reverse engineering**. At some point, before *2010*, the source codes for a few versions of the engine were leaked, this led to the **discover of more dangerous exploits**.

## The anti-cheat systems

Other than these exploits being used to gain access to other people's devices, these are also used by *cheaters* to cheat undetected. As a consequence, those who develop *anti-cheat* systems tend to use these exploits too, which is the reason why, so far, there are no patches that patch certain exploits (these include `469x` patches for *Unreal Tournament*).

So far, there's no anti-cheat system that discloses the downloading of all the `dll` files, as some of these files are embedded in the downloaded packages themselves, thus downloaded without the user consent.

It's up to you if to trust them or not.