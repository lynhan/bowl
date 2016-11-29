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
            AddFood shows with empty findText
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
