# William Wei-Chi Chen — Personal Site

**URL:** https://wxllchxn.dev

Personal site built with Jekyll on GitHub Pages. 

# AI Usage documentation

Cursor with Plan and Agent mode (with Auto model selection) was used to assist site creation. Prompts below

1. I am implementing a personal github page. Attached below is the provided instructions. [Project description attached]. Please plan for Part 1 (Jekyll setup for github pages) with content populated from my resume.

2. We have a very minimalist website - let's try to spice it up a bit more. I'm looking for the following features, with an infinite scroll-esque background.
  - Website organized by sections
    - Introduction (Profile picture, name, resume link, linked in link, github link, bullet points of introduction)
    - Work Experience (maybe tabs for difference experience? Feel free to suggest other organizations)
    - Education
    - Certifications
    - Contact (contact information, email form)
  - Top Nav for navigating to different sections
  Ask any clarifying questions if needed.

3. Now - instead of minima, can we do something a bit more stylized? I want it to look like a fancy startup website, with nice backgrounds and animations.

4. The cards look a bit awkward. Requesting the following changes
  - Let's make each section take over the entire window. On scroll, scroll to the next section
  - Please feel free to look for backgrounds and/or add content so each section doesn't feel too empty

5. Let's make some more edits

Work experience section
- Add small company icons in the jobs button
- Add the dates in the button
- Combine the Amazon experiences, but split the experience in the actual card

Education section
- Add school icons per card, left side of card and full height of card's existing height

Certifications section
- Mirror education section card format per school
- Add AWS/Java icon left of card, left side of card and full height of card's existing height as well

The scroll prompt is also a bit close to the actual text - can we bottom align it?

6. Couple styling concerns
- For Introduction, the scroll is no longer visible on initial viewport, and the content is shifted up.
- The work experience content is a bit shifted down, and the amazon tab hits the bottom of the viewport.
- For all icons, can we have them all use brand-specific/school-specific colors?
- Let's combine the educationd and certifications tab, having the content side-by-side

7. Help me fix the following bugs with my website
- The introduction section is too upward shifted and too long; the scroll prompt appears below the initial viewport
- The work experience tab is too down shifted; navigating to amazon results in the card overflowing beyond the page
- The auto scroll stops at just before the actual color block
- The Educatio and Certifications should be left and right side-by-side, not vertically sequential
- Icons in card for Work experience are not company themed. Please match them to the colors in the button.