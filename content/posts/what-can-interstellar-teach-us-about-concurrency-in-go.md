+++
date = '2025-04-19T21:47:44+05:30'
draft = false
title = 'What Can Interstellar Teach Us About Concurrency in Go'
+++

I spent a significant amount of time this month binge watching GopherCon talks on YouTube. I stumbled upon Rob Pike's [talk](https://www.youtube.com/watch?v=PAAkCSZUG1c) on Go Proverbs. One of the proverbs is _"Do not communicate by sharing memory, share memory by communicating"_. At the time, I didn’t give it much thought, but it stuck with me.

Not long after, _Interstellar_ was re-released in theaters in IMAX. The first time I saw it, back in 2014, I was too young to understand it. But this time, I noticed that the communication between Cooper and Murph is quite similar to the communication between goroutines in Go.

There’s this scene toward the end, where Cooper is inside the Tesseract. It’s this infinite, five-dimensional space built by “them” to help him communicate with his daughter Murph across time. But, he doesn't talk to her directly. He doesn't hand her a note or call her on the phone. He manipulates gravity to send messages through the ticking of the second hand of her watch.

## Cooper and Murph as Goroutines

Think of it like this:
- Cooper is a goroutine.
- Murph is another goroutine.
- They don’t share memory. They live in separate threads of space and time.

If this were C++ or Java, maybe they’d be updating some shared variable with a mutex. But Go encourages goroutines talk to each other through channels.

So in our analogy:
- The Tesseract is the environment that enables communication (the channel).
- Gravity is the message (the data being sent).
- The watch is the receiving end of the channel.

That’s what Rob Pike meant. Instead of locking access to shared memory, just pass the data around using channels.

## The Shared Memory Implementation

```go
package main

import (
	"fmt"
	"sync"
)

var counter = 0
var mu sync.Mutex

func increment(wg *sync.WaitGroup) {
	defer wg.Done()
	mu.Lock()
	counter++
	mu.Unlock()
}

func main() {
	var wg sync.WaitGroup
	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go increment(&wg)
	}
	wg.Wait()
	fmt.Println("Counter:", counter)
}
```

Yes, this works as expected. But its easy to mess up. If someone forgets to lock or unlock the mutex, a race condition is introduced.


## The Go Way
```go
package main

import (
	"fmt"
)

func main() {
	ch := make(chan int)

	// Producer
	go func() {
		for i := 0; i < 1000; i++ {
			ch <- 1
		}
		close(ch)
	}()

	// Consumer
	counter := 0
	for val := range ch {
		counter += val
	}

	fmt.Println("Counter:", counter)
}
```

Here, there's no shared memory to protect. Only one goroutine updates counter, and the others send data to it via the channel.


## Tesseract Analogy
```go

package main

import (
	"fmt"
	"time"
)

// Cooper is the sender goroutine. He's inside the Tesseract.
func cooper(watch chan<- string) {
	time.Sleep(2 * time.Second) // Simulate falling into a black hole
	watch <- "..-. ..- -.-. -.-. .... .-.-.-" // Morse code for "FUTURE."
	fmt.Println("Cooper: Sent data to the watch.")
}

// Murph is the receiver goroutine. She’s back on Earth.
func murph(watch <-chan string) {
	fmt.Println("Murph: Waiting for signal from the ghost...")
	msg := <-watch
	fmt.Printf("Murph: Decoded message from watch: %s\n", msg)
}

func main() {
	watch := make(chan string)
	go cooper(watch)
	go murph(watch)
	time.Sleep(3 * time.Second) // Wait for everything to finish
}
```
Hence, when building concurrent systems:-
- Avoid shared memory where possible.
- Think in terms of messages, not locks.
- Let your goroutines communicate via channels.

This doesn't mean you should never use mutexes. There are cases when they are the right choice, especially when performance is critical or you're doing low level system programming.
