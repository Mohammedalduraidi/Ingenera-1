const { Missions } = require('../../../Database/missionsSchema');


module.exports = addMisstion = (req, res) => {
    console.log("check body ", req.body)
    let mission = new Missions({ ...req.body, isDeleted:0 });

    mission.save((err, data) => {
        if (err) {
            console.log("Erorr ", err);
            res.sendStatus(500);
            return;
        }
        res.send({ message: "Your mission has been saved", status: 200})
        return;
    });

};