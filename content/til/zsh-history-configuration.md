+++
date = '2025-02-19T07:25:54+05:30'
draft = false
title = 'ZSH History Configuration'
+++

While setting up [dotfiles with GNU Stow](/posts/dotfiles-and-stow), I realized that my ZSH History was a mess. Commands were duplicated, some disappeared mysteriously, and searching through history felt like looking for a needle in a haystack. A quick search on GitHub / Stack Overflow led me to these helpful ZSH history options:

```sh
# History file location
HISTFILE=~/.zsh_history

SAVEHIST=10000
HISTSIZE=50000

# Improve history behavior
setopt HIST_IGNORE_ALL_DUPS   # Remove older duplicate entries, keeping only the latest
setopt HIST_IGNORE_DUPS       # Prevent consecutive duplicate commands from being stored
setopt HIST_SAVE_NO_DUPS      # Don't write duplicate commands to history
setopt HIST_EXPIRE_DUPS_FIRST # Expire duplicate entries first when trimming history
setopt HIST_IGNORE_SPACE      # Don't save commands that start with a space
setopt HIST_REDUCE_BLANKS     # Remove unnecessary whitespace from history entries
setopt HIST_VERIFY            # Require confirmation before executing history commands
setopt SHARE_HISTORY          # Share history across multiple terminal sessions
setopt INC_APPEND_HISTORY     # Immediately append new commands to history file

# Prevent history file corruption (important for large history)
setopt EXTENDED_HISTORY  # Save timestamps for each command
setopt APPEND_HISTORY    # Append history instead of overwriting it
setopt HIST_NO_STORE     # Prevent 'history' command itself from being stored
```

## Note:
- `HISTSIZE` determines how many commands are kept in memory during the session.
- `SAVEHIST` controls how many are saved to the history file.

**Tip:** Starting a command with a space will keep it out of history.

## Sources
- https://stackoverflow.com/questions/26846738/zsh-history-is-too-short
- https://github.com/rothgar/mastering-zsh/blob/master/docs/config/history.md#configuration
