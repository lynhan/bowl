database models

    food
        place id
        review ids
        name

    place
        food ids
        name

    review
        user id
        food id
        bool

    user
        reviews
        name

components
    App
        NavBar...state: findText
            Home
            Me
            FindBar
        Browse {places/, food/, add/}...props: findText
            List of places or foods
            AddFood shows when query has 0 results
                food name input
                AddPlace
                AddReview
        Profile
            PlaceProfile {p/place id}
                Info about place
                List of food
            FoodProfile {f/food id}
                Info about food
                AddReview
                List of reviews
            UserProfile {u/user id}
                Info about user
                List of reviews
        REUSABLE
            Info: name
            List: array of info components

separate nav bar from rest of app
pro
- align with ui separation
- decouple from rest of app
- floating constant
con
- more mental effort to track flow of query string
