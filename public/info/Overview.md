# What you should know about Unreal packages

*Unreal Engine (1-3)* **packages are archives**, these include *`.u` files, map files, texture packs* and so on.

What you may not know is that these archives can, through a *simple exploit*, **store literally anything** such as *viruses*.
<br>
Knowledge of `Unreal Script` alone is enough to embed, extract and run files on any device that loads a package.

## Who's in danger?

You just need to load a package, so **pretty much everyone in the community**.
<br>
A malicious package can **gain full access to the device** it is loaded on, this can be a **server** or a **client** machine.

## What kind of packages?

All packages have the same structure, the filename *extensions* (`.unr`, `.utx`, `.umx`) are for organizational purpose only. They all can contain and run code.

## Exploits discovery

Initially, the native side (`c++`, etc) of *Unreal Engine* wasn't *open-source*, it was instead licensed to game developers under payment, unlike *scripts* developed through the *scripting language* (*Unreal Script*).
<br>
At the time, exploits were discovered through **reverse engineering**.

At some point, before *2010*, the source codes for a few versions of the engine were leaked, this led to the **discovery of more dangerous exploits**.

## The anti-cheat systems

These exploits are also used by *cheaters* to stay undetected. As a consequence, those who develop *anti-cheat* systems tend to use these exploits too, which is the reason why, so far, there are no patches that patch certain exploits (these include `469x` patches for *Unreal Tournament*).

So far, there's no *anti-cheat system* that discloses the downloading of all the `dll` files, as some of these are embedded in the downloaded packages themselves, thus downloaded without the user consent.

It's up to you if to trust them or not.