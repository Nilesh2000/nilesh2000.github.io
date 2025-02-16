+++
date = '2025-02-16T12:45:17+05:30'
draft = false
title = 'Dotfiles and Stow'
+++

In college, I had a Windows laptop. When I got my internship, I customized my development setup for the first time. Then came my first full-time job with a new Mac, and I repeated the process. A year later, I spilled coffee on my office laptop, lost everything, and had to start over. I got a replacement and set everything up again. Soon after, I quit my job and bought a personal laptop, only to go through the same tedious process once more. When I joined One2N, I received another office Mac, and by then, the frustration of repeatedly setting up my development environment had started to get to me.

I never used dotfiles back then. Every time I got a new machine, I set it up from scratch—installing packages and restoring configurations from memory. It was inefficient, frustrating, and time-consuming. No matter how carefully I tried to replicate my setup, something was always off. If you're an engineer who has worked with me before, you know I’m an absolute stickler for productivity. I didn’t want to keep wasting time setting up my development environment.

I scoured GitHub to see how other people organized their dotfiles and noticed that most relied on symlinks. I considered doing the same, but it quickly became messy and difficult to manage. Each application had its own configuration path, and every update meant manually fixing symlinks, which was prone to errors.

Then, I came across **GNU Stow**.

## Why Stow?

Manually managing dotfiles was tedious and error-prone. Stow simplified everything by letting me keep all my configurations in one place and symlink them automatically.

I used topical organization (inspired by [Holman's dotfiles](https://github.com/holman/dotfiles)) to set up my dotfiles structure:

```
.
├── .gitignore
├── git
│   └── .gitconfig
├── iterm2
│   └── com.googlecode.iterm2.plist
├── vim
│   └── .vimrc
├── vscode
│   ├── extensions.txt
│   ├── keybindings.json
│   └── settings.json
└── zsh
    ├── .zsh_aliases
    └── .zshrc

5 directories, 9 files
```

Applying configurations became as simple as running:

```sh
stow --target=$HOME git vim zsh
stow --target="$HOME/Library/Application Support/Code/User" --ignore='extensions.txt' vscode
stow --target="$HOME/Library/Preferences" iterm2
```

Now, all my configurations were linked correctly, ensuring a consistent setup across machines. Everything just works, exactly the way I expect it to.

## Resources
- [GNU Stow](https://www.gnu.org/software/stow/)
- [My Dotfiles (WIP)](https://github.com/Nilesh2000/dotfiles)
