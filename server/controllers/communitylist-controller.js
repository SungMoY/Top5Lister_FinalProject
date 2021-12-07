const CommunityList = require('../models/communityList-model');

createCommunityList = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(401).json({
            success: false,
            error: 'You must provide a community list',
        })
    }
    const communitylist = new CommunityList(body);
    console.log("creating communityList: " + JSON.stringify(communitylist));
    if (!communitylist) {
        return res.status(402).json({ success: false, error: err })
    }
    communitylist
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                communitylist: communitylist,
                message: 'community list Created!'
            })
        })
        .catch(error => {
            console.log(error)
            return res.status(403).json({
                error,
                message: 'communitylist Not Created!'
            })
        })
}

updateCommunityList = async (req, res) => {
    const body = req.body
    console.log("updateCommunityList: " + JSON.stringify(body));
    if (!body) {
        return res.status(402).json({ 
            success: false,
            error: 'You must provide a body to update',
        })
    }
    CommunityList.findOne({ _id: req.params.id }, (err, communityList) => {
        console.log("communitylist found: " + JSON.stringify(communityList));
        if (err) {
            return res.status(404).json({
                err,
                message: 'community list not found!',
            })
        }
        console.log("IN THE SERVER: ", communityList)
        console.log("IN THE SERVER2: ", body)
        communityList.name = body.name
        communityList.items = body.items
        communityList.updateDate = body.publish
        communityList.likes = body.likes
        communityList.dislikes = body.dislikes
        communityList.comments = body.comments
        communityList.views = body.views
        //ADD MORE STUFF TO UPDATE HERE
        communityList
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: communityList._id,
                    message: 'CommunityList updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'CommunityList not updated!',
                })
            })
    })
}

deleteCommunityList = async (req, res) => {
    CommunityList.findById({ _id: req.params.id }, (err, communityList) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'communityList not found!',
            })
        }
        CommunityList.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: communityList })
        }).catch(err => console.log(err))
    })
}

deleteCommunityListByName = async (req, res) => {
    const body = req.body
    console.log("TEST: ", body.payload)
    CommunityList.findOne({ name: body.payload }, (err, communityList) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'communityList not found!',
            })
        }
        CommunityList.findOneAndDelete({ name: body.payload }, () => {
            return res.status(200).json({ success: true, data: communityList })
        }).catch(err => console.log(err))
    })
}

getCommunityListById = async (req, res) => {
    await CommunityList.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, communityList: list })
    }).catch(err => console.log(err))
}
getCommunityListByName = async (req, res) => {
    console.log("TEST GETTING BY NAME: ", req.query.payload)
    await CommunityList.findOne({name: req.query.payload}, (err, communityList) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'communityList not found!',
            })
        }
        return res.status(200).json({ success: true, data: communityList })
    }).catch(err => console.log(err))
}

getCommunityListPairs = async (req, res) => {
    await CommunityList.find({ }, (err, communityList) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!communityList) {
            console.log("!communitylists.length");
            return res
                .status(408)    //was 404
                .json({ success: false, error: 'community lists not found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in communityList) {
                let list = communityList[key];
                let pair = {
                    _id: list._id,
                    name: list.name,
                    items: list.items,
                    comments: list.comments,
                    likes: list.likes,
                    dislikes: list.dislikes,
                    updateDate: list.updateDate,
                    views: list.views
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

module.exports = {
    createCommunityList,
    updateCommunityList,
    deleteCommunityList,
    deleteCommunityListByName,
    getCommunityListByName,
    getCommunityListPairs,
    getCommunityListById
}