// Customer hook validates the post field

import { useState, useEffect } from "react";

export const usePostValidation = ({post = ""}) => {
    const [hasPost, setHasPost] = useState(null);

    useEffect (() => {
        setHasPost(/^[a-zA-Z ,.'-]+$/.test(post));
    },[post])

    return hasPost;
};