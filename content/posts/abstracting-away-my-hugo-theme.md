+++
date = '2025-06-19T16:08:31+05:30'
draft = true
title = 'Abstracting Away My Hugo Theme'
+++

If you've worked with me before, you'd know I enjoy building things from absolute scratch. I believe this approach helps me learn from first principles and gain a deeper understanding of any topic I'm exploring.

So naturally, when I decided to use Hugo for my blog, I chose to design the site myself rather than use one of the preset Hugo themes. I figured this would be a good opportunity to brush up on my rusty CSS skills while creating something truly my own.

After I started writing here, someone I knew mentioned they liked my site's design. This surprised me since I hadn't done anything particularly fancy. I had deliberately taken an extremely minimal approach, focusing entirely on centering my design around the content over aesthetics. When they suggested I abstract the theme into a separate repository so others could reuse it, I was initially hesitant. I wasn't very keen on maintaining another repository.

But, then I realized that doing this would actually clean up my code by keeping things more organized and modular. Plus, it'd be a great way to get my work out there and share it with others.

So, I polished my theme, introduced a couple of new parameters to make the site more flexible, and published it as a separate repository. If you like the design of my site, feel free to check out the theme [here](https://github.com/Nilesh2000/minimal).


## How to Extract Your Hugo Theme

Here's the step-by-step process I followed to separate my custom theme from my site:

1. Prepare Your Theme
Create a `theme.toml` file in your `themes/<theme-name>` directory:
```toml
name = "<theme-name>"
license = "MIT"
licenselink = "https://github.com/yourusername/<theme-name>/blob/main/LICENSE"
description = "A <theme-name> Hugo theme"
homepage = "https://github.com/yourusername/<theme-name>"
tags = ["<theme-name>", "clean", "simple"]
features = ["responsive"]
min_version = "0.41.0"

[author]
  name = "Your Name"
  homepage = "https://yourwebsite.com"
```

2. Create the Theme Repository
Navigate to your theme directory and initialize a new Git repository:
```bash
git init
```

3. Copy over the contents of the theme folder from the old repository to the new one.

4. Commit and push the changes to the new GitHub repository.
```bash
git add .
git commit -m "Add theme.toml"
git push
```

5. Update Your Main Site
Go back to your site's root directory and remove the theme from Git tracking:
```bash
git rm -r --cached themes/<theme-name>
rm -rf themes/<theme-name>
```

6. Add your new theme as a git submodule.

```bash
git submodule add https://github.com/yourusername/<theme-name>.git themes/<theme-name>
git add .gitmodules themes/<theme-name>
git commit -m "Add theme as submodule"
```

7. Update the `theme` field in the `config.toml` file to point to the new theme.
```toml
theme = "<theme-name>"
```

8. Test Everything
Run your site locally to ensure everything still works:
```bash
hugo server
```

9. If you update your theme, and want the changes to be reflected in your site, you can run the following command:
```bash
git submodule update --remote --merge
```
