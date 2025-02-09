---
title: "RFC1 - The HOST software"
summary: "What I learn from RFC1"
draft: false
showtoc: false
cover:
  image: "img/rfc-1.png"
  alt: "RFC - the beginning"
  caption: "The Origin"
  relative: true
date: 2025-02-09
tags: ["rfc", "software"]
categories: ["posts"]
---

Yesterday, for some reason, I realized I had never read RFC 1. I was thinking
about a small detail regarding Kubernetes service ports and the HTTP protocol
when a thought hit me: I've never read the very first RFC.

Why not? More importantly, what does RFC 1 even discuss? I had the power to
find out, so that's exactly what I did.

[RFC 1](https://datatracker.ietf.org/doc/html/rfc1) was written by [Steve Crocker](https://en.wikipedia.org/wiki/Steve_Crocker) on April 7, 1969. It's an eleven-page document outlining a basic protocol for
establishing bidirectional communication between two remote machines.

It was a simple read, but it revealed the meaning behind concepts I've been
using for over two decades: `TTY` and `echo`.

`TTY` stands for Teletype — a more advanced typewriter that could send and receive
messages over a wire.

`Echo` is an interesting one. Back then, the only way to
acknowledge receipt of a message was to send it back to the origin in the exact
same order, like an echo.

One concept I wasn't familiar with is the Display Editing Language (DEL). This
idea, which later evolved into the Decode-Encode Language described in [RFC 5](https://datatracker.ietf.org/doc/html/rfc5), was a clever solution to a limitation of TTYs at the time. TTYs processed input
character by character, which could hurt performance. As explained in the RFC:

> If the user types H E L L O <- <- P <CR>, where <- is rubout and <CR> is carriage-return, he has made nine keystrokes. If each of these keystrokes causes a message to be sent, which in turn invokes instructions on our display station, we will quickly become bored.

It was a 30-minute read, but I walked away with a new understanding of tools I
use every day. I've also left you some videos about teletypes and how they work.

{{< youtube "jxkygWI-Wfs" >}}
