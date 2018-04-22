import { 
    HOME_PAGE_LOADED,
    HOME_PAGE_ERRORED,
    HOME_PAGE_LOADING
   } from './constants/ActionTypes';


export function homePageLoaded(message){
    return {
        type: HOME_PAGE_LOADED,
        message
    };
}

export function homePageLoading(bool){
    return {
        type: HOME_PAGE_LOADING,
        isLoading: bool
    };
}


export function homePageErrored(bool){
    return {
        type: HOME_PAGE_ERRORED,
        hasErrored: bool
    };

}

export function loadHome() {
    return (dispatch) => {
        dispatch(homePageLoading(true));

        fetch('https://api.otreeba.com/v1/strains')
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(homePageLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(homePageLoaded("Well Done u deserve a joint")))
            .catch(() => dispatch(homePageErrored(true)));
    };
}
