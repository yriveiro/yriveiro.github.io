---
title: "Git Worktree - The hidden Gem"
summary: "A retrospective on one year usage of git worktrees"
draft: false
showtoc: false
cover:
  image: "img/git-worktree.png"
  alt: "Git Worktree"
  caption: "The hidden gem of Git."
  relative: true
date: 2024-01-14
tags: ["git", "worktree"]
categories: ["posts"]
---

One inherent characteristic of my work is context switching.

Warping between Git branches is something I need to do often. Helping others on
any roadblock they may encourage is my current mission.

When working in a Git mono repository, this phenomenon becomes even worse. Each
time I needed to review a pull request, the Git command dance began. How much time
was I wasting on this dance?. In short, it was a lot.

Do you remember my mission? If I'm more efficient, I can help more people.

$$\text{Efficiency} = \frac{\text{Useful Work Accomplished}}{\text{Total Time Expended}} \times 100$$

It was time to do the most important thing an engineer can do: **fix stuff**.

For me, any thought in my head starts with a simple question, in this case:

> *how to check out two different branches at the same time?*

and the infinity pool of knowledge, the Internet, answered me with:

> *`git-worktree` you must try!*

## Git Worktree

Ok, the internet answered, but why? Why [git-worktree](https://git-scm.com/docs/git-worktree)
was the answer for my problem?

> *"A git repository can support multiple working trees, allowing you to check out
> more than one branch at a time."*

I can't live without worktrees anymore. There is no rollback for me, I can have different
branches in each of my Tmux panes and navigate code much faster than before. I don't
need to stash my work to review a pull request, I can different branches at scale
with Kdiff3 if I want.

In this journey also started to use bare repositories. I found out they work better
with worktrees after overcome some minor details.

For example, `bare` repositories don't checkout branches from the origin by
default, from the Git documentation of [--bare](https://git-scm.com/docs/git-clone#Documentation/git-clone.txt---bare)?

> *"When this option is used, neither remote-tracking branches nor the related
> configuration variables are created."*

```sh
git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"
```

A simple fix for this behaviour is configuring the fetch option for the remote
origin. Doing this every time is not the way. I ended up crafting a Zsh function
for this:

<!-- markdownlint-disable MD013 -->

```sh
# ANSI color codes
RED="\033[0;31m"
GREEN="\033[0;32m"
RESET="\033[0m"

# Symbols
CROSS_MARK="✗"
CHECK_MARK="✔"

CROSS="${RED}${CROSS_MARK}${RESET}"
CHECK="${GREEN}${CHECK_MARK}${RESET}"

# Clones a Git repository with customizable service host and protocol.
# Usage: cloneGitRepo <repository_path> [service_host] [protocol]
function gcb() {
  local repository_path=${1:-}
  local service_host=${2:-github.com}
  local protocol=${3:-ssh}

  if [[ -z "$repository_path" ]]; then
    echo "${CROSS} Repository path is required."
    return 1
  fi

  if [[ "$protocol" != "ssh" && "$protocol" != "https" ]]; then
    echo "${CROSS} Invalid protocol, use ssh or https."
    return 1;
  fi

  local url
  if [[ "$protocol" == "ssh" ]]; then
  url="git@${service_host}:${repository_path}.git"
  else
    url="https://${service_host}/${repository_path}.git"
  fi

  local repository="${repository_path##*/}"

  git clone --bare "${url}" "${repository}"

  if [ $? -ne 0 ]; then
    echo "${CROSS} Failed to clone repository."
    return 1
  fi

  cd "${repository}" || {echo "${}CROSS Failed to enter ${repository}."; return 1;}

  # Check if the 'main' branch exists, fall back to 'master' if not
  local branch_name="main"
  if ! git show-ref --verify --quiet "refs/heads/${branch_name}"; then
    branch_name="master"

    if ! git show-ref --verify --quiet "refs/heads/${branch_name}"; then
      echo "${CROSS} Neither 'main' nor 'master' branches found."
      return 1
    fi
  fi

  git worktree add "$branch_name" || { echo "${CROSS} Failed to add worktree for main."; return 1; }
  git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"

  echo "${CHECK} Cloned ${repository_path} to ${repository}"
}
```

I found the solution to **my** problem, I hope this reading help you find out the solution for yours.

If we share the same and you find out this useful, share the knowledge out there 😀

And to close this topic, the most important of all advices 😉 ...

![RTFM](img/rtfm.jpg)
