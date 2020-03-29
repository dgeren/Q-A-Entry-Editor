# Q-A-Entry-Editor
This was a quick project to work out the methodology for an in-page editor for a Questions &amp; Answers web app using a modified markdown system.

It's not set up as plug-n-play or as an API, yet. As is, it only works with the demo page and no external data. Feel free to fork it into something more useful.

This modifier-character set is defined in the HTML and appears on the page in edit mode. Some of the symbols used are easily typed on a Mac keyboard but may be more difficult to use with Windows. Modify the RegExp to use characters more easily typed in the Windows OS.

On a Mac, to type the quotation marks used for the paragraph tags press opt + \ and shift + opt + \. The tickmarks are the unmodified tilde key next to the number 1 (in the number row, not in the keypad if you're using an extended keyboard) to make inline code and code blocks. Press opt + 8 to type the bullet to mark list items. As with HTML tags, this markup system requires that you close the markdown tags, but without requiring a special closing character (as the / is for HTML).

Examples:
  A paragraph: «This is a paragraph» 
  An unordered list with 2 items: #u•item 1••item 2#u
