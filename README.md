# LoveFeed

Inspired by Buzzfeed, LoveFeed assesses what users want. At the end of the quiz, it provides a link regarding your love language for you to send to the people in your life, so they know how to love you in the form you are most receptive to! :) 

[deployed url](https://dartmouth-cs52-21s.github.io/lab2-snow-kang/)

## What Worked Well
- I feel like I'm starting to feel comfortable with flexboxes. I noticed I now can usually execute the layout ideas that are in my head which is a huge improvement from the last assignment where it took me a while to get everything in its correct location! I learned about animation and keyframes and also how to work with the DOM. I first coded everything using jquery and then I went through and replaced it all with vanilla javascript to learn.

## What Didn't
- I still struggle with picking good designs. Once I finished the base version, I didn't know what to add that would look nice, and somehow I ended up with what I have now which is a lot, lot, lot of color. I'm a little worried for the final project since both my landing page and this assignment kind of have childish aesthetics (sadly, this is my aesthetic lol) when I want to produce something more sleek and modern. Also, there was a point where I got stuck trying to determine the order of the function calls when I was working with setTimeout for my typewriter effect. I was recommended to look into the event loop, and I bookmarked a Youtube video of it to check out! I had a lot of fun though and am continuing to learn a lot with each assignment and lecture :D

## Extra Credit
- It's better to place the JavaScript tag right before the closing body tag as opposed to in the head tag because you want to prioritize rendering the page before executing any scripts. In a worst case scenario, your JavaScript running slowly could cause the user to be stuck on a blank page. 
- Sidebar keeps track of answered questions; can also navigate on click
- Did both JSON + committed to a powerpuff girl-esque theme   
    - Added scrolling hearts animation for each question
    - Rainbow gradient animation on hover and rainbow gradient static on selected for answer choices
    - Have a purple heart cursor for default and a pink heart cursor for pointer
    - Modal has rose petal animation in background and typewriter effect w/ fade-in
- Each time you answer a question, it auto scrolls you to the earliest question you still need to complete. If you click submit before you finish, it will similarly scroll you to the question that still must be answered. When you finish all questions, a rainbow border appears over the calculate button
- For odd questions, have one layout, and for even questions, have another
- Didn't user jquery
- Functional with all device sizes

## Screenshots
