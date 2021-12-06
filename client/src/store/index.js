import { Global } from '@emotion/react';
import { createContext, useContext, useState } from 'react'
//import { useHistory } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_SEARCH: "SET_CURRENT_SEARCH",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    RESET: "RESET",
    UPDATE_SINGLE_LIST_VIEW: "UPDATE_SINGLE_LIST_VIEW"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listBeingEdited: null,
        listMarkedForDeletion: null,
        communityListIdNamePairs: [],
        currentPage: null,
        currentSearch: null
    });
    //const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listBeingEdited: null,
                    listMarkedForDeletion: null,
                    communityListIdNamePairs: store.communityListIdNamePairs,
                    currentPage: store.currentPage,
                    currentSearch: store.currentSearch
                })
            }
            // GET THE LISTS OF EACH CRITERIA SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload.selected,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listBeingEdited: null,
                    listMarkedForDeletion: null,
                    communityListIdNamePairs: store.communityListIdNamePairs,
                    currentPage: payload.page,
                    currentSearch: ""
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listBeingEdited: null,
                    listMarkedForDeletion: payload,
                    communityListIdNamePairs: store.communityListIdNamePairs,
                    currentPage: store.currentPage,
                    currentSearch: store.currentSearch
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listBeingEdited: null,
                    listMarkedForDeletion: null,
                    communityListIdNamePairs: store.communityListIdNamePairs,
                    currentPage: store.currentPage,
                    currentSearch: store.currentSearch
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listBeingEdited: null,
                    listMarkedForDeletion: null,
                    communityListIdNamePairs: store.communityListIdNamePairs,
                    currentPage: store.currentPage,
                    currentSearch: store.currentSearch
                });
            }
            // HANDLING SEARCHES - need to implement once more data
            case GlobalStoreActionType.SET_CURRENT_SEARCH: {
                return setStore({
                    idNamePairs: payload.showLists,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listBeingEdited: store.listBeingEdited,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    communityListIdNamePairs: store.communityListIdNamePairs,
                    currentPage: store.currentPage,
                    currentSearch: payload.searchKey
                })
            }
            case GlobalStoreActionType.RESET: {
                return setStore({
                    idNamePairs: [],
                    currentList: null,
                    newListCounter: 0,
                    listBeingEdited: null,
                    listMarkedForDeletion: null,
                    communityListIdNamePairs: [],
                    currentPage: null,
                    currentSearch: null
                })
            }
            case GlobalStoreActionType.UPDATE_SINGLE_LIST_VIEW: {
                return setStore({
                    idNamePairs: payload,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listBeingEdited: store.listBeingEdited,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    communityListIdNamePairs: store.communityListIdNamePairs,
                    currentPage: store.currentPage,
                    currentSearch: store.currentSearch
                })
            }
            default:
                return store;
        }
    }

    store.refreshAll = function () {
        console.log("BEFORE STORE RESET: ", store)
        storeReducer({
            type: GlobalStoreActionType.RESET,
            payload: null
        })
        console.log("AFTER STORE RESET: ", store)

    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // HANDLES SEARCHING TODO
    store.searchFunction = function (searchText) {
        console.log("SearchText: ", searchText)
        //update currentSearch in store
        //parse through idNamePairs
        //update shown idNamePairs to show the ones hit by search
        let parsedIdNamePairs = []
        switch (store.currentPage) {
            case "HOME":
                parsedIdNamePairs = this.idNamePairs.filter((pair) => (pair.name.toUpperCase().startsWith(searchText.toUpperCase())))
                break;
            case "USERS":
                parsedIdNamePairs = this.idNamePairs.filter((pair) => (pair.username.toUpperCase().startsWith(searchText.toUpperCase())))
                break;
            case "GROUP":
                parsedIdNamePairs = this.idNamePairs.filter((pair) => (pair.name.toUpperCase().startsWith(searchText.toUpperCase())))
                break;
            case "COMMUNITY":
                parsedIdNamePairs = this.idNamePairs.filter((pair) => (pair.name.toUpperCase().startsWith(searchText.toUpperCase())))
                break;
            default:
                break;
        }
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_SEARCH,
            payload: {
                searchKey : searchText,
                showLists : parsedIdNamePairs
            }
        })
    }

    // THIS FUNCTION CREATES A NEW LIST AND SETS IT AS THE CURRENTLIST. WHEN THE CURRENTLIST IS NOT NULL, THE WORKSPACE SCREEN OPENS
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        let payload = {
            name: newListName,
            items: ["", "", "", "", ""],
            ownerEmail: auth.user.email,
            username: auth.user.username,
            comments: [],
            likes: [],
            dislikes: [],
            publish: "unpublished",
            views: 0
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // LOADIDNAMEPAIRS FUNCTIONS EACH LOAD ALL THE LISTS IN THE DB BASED ON THE CRITERIA
    store.loadIdNamePairs = async function () {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: {
                    selected: pairsArray,
                }
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }
    store.loadIdNamePairsHOME = async function () {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;

            let selectedPairsArray = pairsArray.filter(function (pair) {
                return pair.email === auth.user.email
            })

            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: {
                    selected: selectedPairsArray,
                    page: "HOME"
                }
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }
    store.loadIdNamePairsGROUP = async function () {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;

            let selectedPairsArray = pairsArray.filter(function (pair) {
                return (pair.publish !== "unpublished")
            })

            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: {
                    selected: selectedPairsArray,
                    page: "GROUP"
                }
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }
    store.loadIdNamePairsUSERS = async function () {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;

            let selectedPairsArray = pairsArray.filter(function (pair) {
                return (pair.publish !== "unpublished")
            })

            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: {
                    selected: selectedPairsArray,
                    page: "USERS"
                }
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    // THIS IS A WHOLE THING TO GET THROUGH TODO
    store.loadIdNamePairsCOMMUNITY = async function () {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            console.log("PAIRS ARRAY: ", pairsArray)
            let selectedPairsArray = pairsArray.filter(function (pair) {
                return (pair.publish !== "unpublished")
            })

            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: {
                    selected: selectedPairsArray,
                    page: "COMMUNITY"
                }
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    // wHEN THE DELETE LIST BUTTON IS HIT ON THE MODAL, THE LIST IS DELETED AND THE USER RETURNS TO HOME LISTS
    store.markListForDeletion = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }
    store.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            store.loadIdNamePairsHOME();
        }
    }
    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }
    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // WHEN THE EDIT BUTTON IS HIT ON A LIST CARD, THIS OPENS THE LIST IN THE WORKSPACE SCREEN
    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: top5List
                });
            }
            console.log("Workspace opened for this list: ", top5List)

        }
    }
    
    // AFTER UPDATING LIST, GO BACK TO HOME LISTS
    store.updateCurrentList = async function (newTop5List) {
        //console.log(store.currentList._id, store.currentList)
        const response = await api.updateTop5ListById(store.currentList._id, newTop5List);
        if (response.data.success) {
            store.loadIdNamePairsHOME();
        }
    }
    store.addView = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List
            console.log(top5List.views)

            top5List.views = ++top5List.views

            let responsetwo = await api.updateTop5ListById(top5List._id, top5List);
            if (responsetwo.data.success) {
                //console.log("Incremented view count of "+top5List.name)
                /*
                switch (store.currentPage) {
                    case "HOME":
                        store.loadIdNamePairsHOME();
                        break;
                    case "USERS":
                        store.loadIdNamePairsUSERS();
                        break;
                    case "GROUP":
                        store.loadIdNamePairsGROUP();
                        break;
                    case "COMMUNITY":
                        store.loadIdNamePairsCOMMUNITY();
                        break;
                    default:
                        break;
                }*/

                let currentShown = this.idNamePairs
                let foundListIndex = currentShown.findIndex(element => element._id === id)

                currentShown[foundListIndex] = top5List

                storeReducer({
                    type: GlobalStoreActionType.UPDATE_SINGLE_LIST_VIEW,
                    payload: currentShown
                })
            }
        }
    }
    store.addComment = async function (id, commentText) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List
            let author = auth.user.username
            let entireComment = [author, commentText]
            top5List.comments.push(entireComment)
            let responsetwo = await api.updateTop5ListById(top5List._id, top5List);
            if (responsetwo.data.success) {
                //console.log("added comment")
                switch (store.currentPage) {
                    case "HOME":
                        store.loadIdNamePairsHOME();
                        break;
                    case "USERS":
                        store.loadIdNamePairsUSERS();
                        break;
                    case "GROUP":
                        store.loadIdNamePairsGROUP();
                        break;
                    case "COMMUNITY":
                        store.loadIdNamePairsCOMMUNITY();
                        break;
                    default:
                        break;
                }
            }
        }
    }
    store.handleLike = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List

            console.log("LIKES BEFORE: ", top5List.likes, auth.user.username)
            console.log("ALREADY LIKED?: ",top5List.likes.includes(auth.user.username))

            if (top5List.likes.includes(auth.user.username)) {
                //remove like
                const index = top5List.likes.indexOf(auth.user.username)
                if (index > -1) { top5List.likes.splice(index, 1) }
                console.log("REMOVING LIKE")
            } else {
                // add like
                // before i add like, check if this list is disliked. if it is disliked, then remove the dislike and add the like
                if (top5List.dislikes.includes(auth.user.username)) {
                    const index = top5List.dislikes.indexOf(auth.user.username)
                    if (index > -1) { top5List.dislikes.splice(index, 1) }
                }
                top5List.likes.push(auth.user.username)
                console.log("ADDING LIKE")
            }

            console.log("LIKES AFTER: ", top5List.likes)

            let responsetwo = await api.updateTop5ListById(top5List._id, top5List);
            if (responsetwo.data.success) {
                console.log("handled Like")
                switch (store.currentPage) {
                    case "HOME":
                        store.loadIdNamePairsHOME();
                        break;
                    case "USERS":
                        store.loadIdNamePairsUSERS();
                        break;
                    case "GROUP":
                        store.loadIdNamePairsGROUP();
                        break;
                    case "COMMUNITY":
                        store.loadIdNamePairsCOMMUNITY();
                        break;
                    default:
                        break;
                }
            }
        }
    }
    store.handleDislike = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List

            if (top5List.dislikes.includes(auth.user.username)) {
                //remove dislike
                const index = top5List.dislikes.indexOf(auth.user.username)
                if (index > -1) { top5List.dislikes.splice(index, 1) }
            } else {
                // add dislikes
                // before i add dislikes, check if this list is liked. if it is liked, then remove the like and add the dislike
                if (top5List.likes.includes(auth.user.username)) {
                    const index = top5List.likes.indexOf(auth.user.username)
                    if (index > -1) { top5List.likes.splice(index, 1) }
                }
                top5List.dislikes.push(auth.user.username)
            }
            let responsetwo = await api.updateTop5ListById(top5List._id, top5List);
            if (responsetwo.data.success) {
                console.log("handled dislike")
                switch (store.currentPage) {
                    case "HOME":
                        store.loadIdNamePairsHOME();
                        break;
                    case "USERS":
                        store.loadIdNamePairsUSERS();
                        break;
                    case "GROUP":
                        store.loadIdNamePairsGROUP();
                        break;
                    case "COMMUNITY":
                        store.loadIdNamePairsCOMMUNITY();
                        break;
                    default:
                        break;
                }
            }
        }
    }
    store.resetSearch = async function (id) {
        switch (store.currentPage) {
            case "HOME":
                store.loadIdNamePairsHOME();
                break;
            case "USERS":
                store.loadIdNamePairsUSERS();
                break;
            case "GROUP":
                store.loadIdNamePairsGROUP();
                break;
            case "COMMUNITY":
                store.loadIdNamePairsCOMMUNITY();
                break;
            default:
                break;
        }
    }
    store.sortByDateAscending = async function (id) {
        let array = this.idNamePairs
        let sorted = array.sort((item1, item2) => new Date(item1.publish) - new Date(item2.publish))
        console.log("SORTED PAIRS:", sorted)
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_SEARCH,
            payload: {
                searchKey : this.currentSearch,
                showLists : sorted
            }
        })
    }
    store.sortByDateDescending = async function (id) {
        let array = this.idNamePairs
        let sorted = array.sort((item1, item2) => new Date(item1.publish) - new Date(item2.publish))
        let reverse = sorted.reverse()
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_SEARCH,
            payload: {
                searchKey : this.currentSearch,
                showLists : reverse
            }
        })
    }
    store.sortByViews = async function (id) {
        let array = this.idNamePairs
        let sorted = array.sort((item1, item2) => item2.views - item1.views)
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_SEARCH,
            payload: {
                searchKey : this.currentSearch,
                showLists : sorted
            }
        })
    }
    store.sortByLikes = async function (id) {
        let array = this.idNamePairs
        let sorted = array.sort((item1, item2) => item2.likes.length - item1.likes.length)
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_SEARCH,
            payload: {
                searchKey : this.currentSearch,
                showLists : sorted
            }
        })
    }
    store.sortByDislikes = async function (id) {
        let array = this.idNamePairs
        let sorted = array.sort((item1, item2) => item2.dislikes.length - item1.dislikes.length)
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_SEARCH,
            payload: {
                searchKey : this.currentSearch,
                showLists : sorted
            }
        })
    }
    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };