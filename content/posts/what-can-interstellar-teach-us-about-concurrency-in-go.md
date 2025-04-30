+++
date = '2025-04-19T21:47:44+05:30'
draft = false
title = 'What Can Interstellar Teach Us About Concurrency in Go'
+++

--> I have been binge watching Gophercon talks on youtube.
--> I came across Rob Pike's talk of go proverbs
--> he says "Do not communicate by sharing memory, share memory by communicating".
--> interstellar had re-released  and this was the second time i watched it.
--> when it came out first in 2014, i was too young to understand it.

Spoiler Alert:
Really now, you haven't watched Interstellar?

There is this scene towards the end, probably my favorite, where cooper is inside the Tesseract. Its this infinite, hyperdimensional black hole built by "them" to help him communicate with his daughter across time.

But here’s the kicker: he doesn’t shout through space. He doesn’t open a wormhole and throw her a USB stick. He subtly manipulates gravity to send messages through the ticking of a watch.

So the next time you’re building something concurrent in Go, don’t reach for that mutex just yet.
Send a message. Let the Tesseract do its job.

Go, unlike many other languages, encourages a message-passing concurrency model. That means: instead of having multiple threads access and mutate shared memory — risking race conditions and deadlocks — Go asks you to communicate between goroutines using channels.

Cooper, suspended in a higher-dimensional tesseract, can’t reach Murph physically. But he doesn’t need to. He sends her the quantum data through a watch.

That’s a one-way channel.
