# library-cheatsheets-sanityio
A complete overhaul of my library cheatsheets, including the use of Sanity.io as backend.


## Files

index.html - Parcel this (`npx parcel index.html`) and it will mimic a cheatsheet on the library website but using Sanity as backend.
js/index.js - Main file for putting Sanity fed data onto the index.html. 

## Moving to Drupal
`npx parcel build index.html``
New 'Program'
Copy all the HTML from existing one and then get current cheatsheet stuff in (it's slightly changed).
Copy all existing CSS from existing one.
Remove all the Firebase related stuff at the bottom of the HTML.
In script tags at the end of the HTML put the parceled JS.
