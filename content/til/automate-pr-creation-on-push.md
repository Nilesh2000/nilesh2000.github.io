+++
date = '2025-02-28T05:36:49+05:30'
draft = false
title = 'Automate PR Creation on Push'
+++

When working with GitHub, automating the creation of pull requests (PRs) can help streamline workflows. Today, I set up a GitHub Action on the repository of my personal site to automatically create a PR from `develop` to `main` whenever there is a push to `develop`.

## Steps to Set Up
1. Create a new file in your repository under `.github/workflows/create-pr-dev-to-master.yml`.
2. Copy and paste the following GitHub Action configuration into the file:

```yaml
name: Create PR from Develop to Main

on:
  # Trigger this workflow when changes are pushed to the 'develop' branch
  push:
    branches:
      - develop

jobs:
  create-pr:
    # Use the latest Ubuntu runner for execution
    runs-on: ubuntu-latest

    steps:
      # Pulls the latest code from the repository
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up GitHub CLI
        run: |
          gh auth status || gh auth login --with-token <<< "${{ secrets.GITHUB_TOKEN }}"

      - name: Create Pull Request
        # Use GitHub token for authentication
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          # Check if an open pull request from 'develop' to 'main' already exists
          if gh pr list --base main --head develop --state open --json number | jq -e '. | length > 0'; then
            echo "PR already exists. Skipping creation."
          else
            # If no PR exists, create a new one
            gh pr create \
              --base main \
              --head develop \
              --title "`develop` -> `main`" \
              --body "This PR was automatically created via a GitHub Action." \
              --assignee "@me"
          fi

```
3. Select __Read & Write workflow permissions__ under Settings → Actions → General.
4. Enable __Allow GitHub Actions to Create and Approve PRs__ under Settings → Actions → General.
5. Click Save.
6. Push the changes, and the action will trigger automatically on the next push to `develop`.
