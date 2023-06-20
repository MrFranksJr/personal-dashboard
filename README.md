*Jun 20, 2023 - Franky Jr Blondeel*

<p align="center">
<img alt="banner image" src="https://raw.githubusercontent.com/MrFranksJr/MrFranksJr/main/assets/personal-dashboard/Banner.png">
</p>

# dashboard – a chrome extension

## Overview

**Live version [here](https://mrfranks-dashboard.netlify.app/)**

Dashboard (yes, I know the name is VERY generic) is the crown jewel of my time working with APIs. It's been quite a while since I've written and posted something on my GitHub, but I've just been busy with different other little project to do with developing. Spoiler alert: applying for jobs also takes a lot of time 😂

But that's a good thing I guess!

Dashboard has been ready for quite a while though, a couple of months in fact. But I wanted to sign this assignment off officially by writing this little article about it.

The main goal was to interact with different APIs here, and bring it all together in a nice little dashboard, that can be used as an extension in Chrome.

And I went above and beyond on this one, just because I enjoyed it so damn much.

I wanted not only a set of different APIs. But I wanted to save data in local storage, so the thing remembers the choices users make. I wanted efficiency. Only call APIs when necessary. And I wanted to have it look good as well. But most of all, I wanted to have fun with it. And I'm proud of the result.

<p align="center">
<img alt="screenshot of the app" src="https://raw.githubusercontent.com/MrFranksJr/MrFranksJr/main/assets/personal-dashboard/screenshot.png">
</p>

Like I already mentioned, this dashboard app is the final assignment in the APIs chapter of the course I'm following over at [scrimba.com](https://scrimba.com). And it has been an amazing ride.

## Requirements

Here are some of the subjects we discussed in the chapter
<p align="center">
<img alt="topics discussed" src="https://raw.githubusercontent.com/MrFranksJr/MrFranksJr/main/assets/personal-dashboard/recap.png">
</p>

Some of the stretch goals given by the lecturer included:
<p align="center">
<img alt="stretch goals" src="https://raw.githubusercontent.com/MrFranksJr/MrFranksJr/main/assets/personal-dashboard/overview.png">
</p>

And I think I delivered. Let's dive a bit deeper...

## Approach and Development

### The Clock

I started out with the simple stuff. The date & time is simple Javascript, and it gets updated every second, so it stays up to date with the current date and time

I like my clocks in 24h format, and at a certain point I thought of adding functionality that allowed the user to select in which format they wanted to display the clock. This would have been a nice addition and played right into the features I wanted to add anyhow. But I dropped it in the end in favor of different features. Which does not make it impossible to add in the near future of course 😊

### The background

The ultimate goal of the app is that it would be shown each time a user opens up a new tab on their browser, a nice background is there to greet them with some beautiful cityscape or a piece of nature. What better source to call than Unsplash. They're API is easy to interact with, and allows some flexibility, as in, you can define parameters and such of the types of backgrounds you want to call.

One of the parameters I noticed, is that you could deliver a 'retina-ready' type background, meaning, much higher resolutions. So I had built a function at one point, that would detect the user's screen DPI, and it would update if they dragged the window to a different type screen.
The retina images were huge though, and it ended up ruining the experience. I probably need to play around with it a bit more to better understand it, but I canned this feature in the end and instead went for just regular images. In the end though, who would notice? This thing needed to be fast, and functional.

At a certain point I also wanted to give the possibility for users to add their own choices for the types of backgrounds to load. But again, this was 'not challenging' enough and pretty straight forward. I would not have learned as much with this, so I again dropped this feature in favor of other details I added.

But I've gotta say, I really grew to love unsplash, and it just cheers me up using the Dashboard on a daily basis. They really really shine!
<p align="center">
<img alt="example of a beautiful background" src="https://raw.githubusercontent.com/MrFranksJr/MrFranksJr/main/assets/personal-dashboard/background.png">
</p>

### Cryptos
Now, I'm not too big into crypto myself. I have some and I have dabbled into NFTs too. The Web3 technology as a whole I find real interesting though, and it is one of the future paths I see myself taking as a developer.
However, for this assignment, 

















<p align="center">
<img alt="example of a colorapi response" src="https://raw.githubusercontent.com/MrFranksJr/MrFranksJr/main/assets/personal-dashboard/response.png">
</p>

Visualizing everything that is returned, was quite easy.

### First bump: legibility
One interesting issue, is that you cannot predict what color will be returned by the API, and therefore, you cannot know what color the text on screen should have.
After some googling, I found this very interesting repository on github that gave me exactly what I was after: auto contrasting colors: [onury / invert-color](https://github.com/onury/invert-color)

Using NPM I could very easily import the package and use it in my project! This is also the very first timeI used a 'foreign' package (not really, but you know what I mean).
This also meant I had to run an actual build for the first time using Vite, which is the framework I tend to use. Which gave me some problems in the end, I won't go into it too deep, but I was able to solve them.

Using this borrowed package though, I could now very easily return a #FFF or #000 based on the contrast calculation returned by invert-colors. Really handy!
<p align="center">
<img alt="example different font colors in the same color scheme" src="https://raw.githubusercontent.com/MrFranksJr/MrFranksJr/main/assets/personal-dashboard/contrast.png">
</p>

### Improving UX
Next up, with all colors loading in correctly and being displayed on the screen correctly, I wanted to improve the UX a little bit.
Mainly:
* Some animations while data is loading (what if someone has slow internet?)
* Minimalist approach: Less buttons, less text
* Transitions or things appearing on the screen should be smooth.

I started with a small logo animation, when users hit the site first, this allows the colors in the background to be loaded already.
<p align="center">
<img alt="landing page animations" src="https://raw.githubusercontent.com/MrFranksJr/MrFranksJr/main/assets/personal-dashboard/landing.gif">
</p>

Next up, when user loaded in a new palette, I thought it would be nice if the colors came in gradually. So I built a randomizer, which returns a random amount of milliseconds every time you fetch new colors. It just looks a lot better :)
<p align="center">
<img alt="gradual loading of colors" src="https://raw.githubusercontent.com/MrFranksJr/MrFranksJr/main/assets/personal-dashboard/loadingColors.gif">
</p>

Also, I reduced the amount of data that is initially visible on the screen. Meaning, other color spaces are hidden, unless the user hovers over the relevant color block. Also on the text, I added a small transition just to make it all smoother.
<p align="center">
<img alt="text appearing on hover" src="https://raw.githubusercontent.com/MrFranksJr/MrFranksJr/main/assets/personal-dashboard/hoverEffect.gif">
</p>

The app came alive, I liked it!


### Implementing Copy value
I was able to add the copy paste feature in pretty quickly, because I had added it to a previous app before, the password generator I built a couple of months back.
I borrowed the code, adjusted it, made it react to the responsive nature of the app too. Quick win, onto the next.
<p align="center">
<img alt="responsive to adding extra colors" src="https://raw.githubusercontent.com/MrFranksJr/MrFranksJr/main/assets/personal-dashboard/copypaste.gif">
</p>


### Mobile Experience
Now that the entire base site seemed to be setup; I went and looked at how I would tackle the mobile experience.
Of course, the options would have to be reduced inside some hamburger menu somewhere, but there were additional challenged here.

I could (as far as I know at least...) not opt for a standard media query approach here, because I could not predict how many colors the user would have on the screen. The amount of colors on the screen has a direct impact on how readable the text would be inside the bars.
Coolors does something similar, when the bars get thin enough, the text flips 90degrees, or even the bars go all from a vertical orientation to a horizontal one.

So I decided to approach it in a same way.
Therefore, every time the screen is resized OR every time the user changes the amount of colors they want returned, I make a calculation where I take the total width of the screen, and divide it by the number of colors requested.
The returned value lets me know how wide the bars would be. And therefore, I could then decide what I do with the text, and the bars themselves.

Implementing this then brought with it a whole set of new problems 😂 I will not bore you with all the details, most important message is that everything got ironed out in the end.

Below are a couple of examples of the result. Quite proud of this one. Cracking tougher problems is always interesting and you learn a lot along the way.
<p align="center">
<img alt="responsive reacton of the app" src="https://raw.githubusercontent.com/MrFranksJr/MrFranksJr/main/assets/personal-dashboard/responsive.gif">
</p>

<p align="center">
<img alt="responsive to adding extra colors" src="https://raw.githubusercontent.com/MrFranksJr/MrFranksJr/main/assets/personal-dashboard/extraColors.gif">
</p>