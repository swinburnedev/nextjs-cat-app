# Brief

## Front End challenge
This is where you get to show us what you can do. Write us a single page app that fulfils the
spec below and meets the criteria listed.
We know tech tests have a habit of taking a whole weekend, but that’s not necessary here.
You should spend a few hours on this (that’s what we’re expecting). Of course if you want to
spend a weekend and build The World’s Greatest Tech Test we’d be thrilled to review it.
We also use this same test for all of our developers - junior, senior, principal etc - and we’ll
be keeping the level of the role in mind when reviewing. So junior devs will get a little more
slack, while principal devs should come prepared to make us wonder if we’re even qualified
to review your work.
The Spec
So just what is it that this app should do?
It should just meet the following requirements:
1. You should be able to upload a new cat image
2. You should be able to view the cat images you uploaded
3. You should be able to favourite and unfavourite a cat
4. You should be able to vote a cat up or down
5. You should see a score on each cat based on the votes

### The Criteria
- The app should look professionally made. We’re not expecting you to create your
own Design System but the styling should stand up as a modern website to non
technical users, and be ok at various screen sizes.
- Pick the front end framework relevant to the job you’re applying for. This is most
likely between React and Angular, but if the job description says Svelte….
- A lot of modern software development is about using 3rd party packages the right
way, so pick your favourites and show us you know how to use them
- We're expecting the app to do things you’d expect of a modern website, and your
understanding of what that means is part of the Test! Things like validation and error
handling wouldn’t be a bad place to start though..

### The API
The API that your web app should integrate with is thecatapi.com
The Acceptance criteria

#### Requirement 1: Uploading the Cats
Create a page at “/upload” that lets you upload a new cat image. The requirements are:
1. Allow a user to select a file from their PC to upload
2. Uploads the image to this API endpoint.
3. After uploading successfully it returns the user to the “/” page, otherwise it displays
validation errors and errors returned from API.

#### Requirement 2: Listing the Cats
Create a page at “/” that lists the cat images that you have uploaded using this API endpoint.
1. Display in a responsive way, up to a maximum of 4 cat images per row, it should neatly
scale down to a 340px wide viewport and ensure images are not stretched.

#### Requirement 3: Favoriting the Cats
On the listing at “/” add a “favourite” / “unfavourite” button (it can also be a filled/unfilled heart
if you desire) that allows the user to toggle saving the image as a favourite. The
requirements are:
- Clicking “favourite”, calls this API endpoint and changes text on button to be “unfavourite” (or heart to filled).
- Clicking “unfavourite” , calls this API endpoint and changes text on the button to be “favourite” (or heart to unfilled).

#### Requirement 4: Voting the Cats
On the listing at “/”:
- Add a “vote up” and a “vote down” below each of the Cat images that calls this API
saving the vote made on the Cat

#### Requirement 5: Scoring the Cats
- Display the score for each cat below the image using this API endpoint. The score is
equal to (Number of up votes - Number of down votes)