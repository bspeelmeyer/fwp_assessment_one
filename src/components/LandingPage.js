import React from 'react';


// This component returns the landing page 
// content that the user will see when
// they first come to the applciation

const LandingPage = () => {

    return (
        <div class="container bg-dark">
            <div className="row">
                <h1 class="text-white text-center">Welcome to VibeCheck</h1><br/>
                <p class="text-white text-center">VibeCheck is a place where you can chat <br/>with fellow students about everything to <br/> do with your university and studies.</p>
               
            </div>
        </div>
    );
}

export default LandingPage;