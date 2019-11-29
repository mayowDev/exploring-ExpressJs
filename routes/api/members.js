const express = require("express");
const route = express.Router();
const uuid = require("uuid");
const members = require("../../Members");

// get/Read all members
route.get("/", (req, res) => res.json(members));

// get/Read single member
route.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `no member found with ${req.params.id}` });
  }
});

// ================> create new member ==================

route.post("/", (req, res) => {
  // res.send(req.body)
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "please include name and email" });
  }
  // add newMember into our members
  members.push(newMember);
  // res.json(members); //shows the api
  res.redirect("/"); //redirect to homepage
});

// ===============>     Update  Member =====================

route.put("/:id", (req, res) => {
  // grap the id that we gonna update using some();
  const found = members.some(member => member.id === parseInt(req.params.id));

  // updated the selected id
  if (found) {
    // get req.body
    const updateMember = req.body;
    // loop through members and check if
    members.forEach(member => {
      // check the id that we are updating
      if (member.id === parseInt(req.params.id)) {
        // update email and name only if they req
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;

        // send succes masge
        res.json({ msg: "member was updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `Please select existing member to update` });
  }
});

// =====================> Delete Member ===================

route.delete("/:id", (req, res) => {
  // find the id we wanna delete
  const found = members.some(member => member.id === parseInt(req.params.id));
  // condition
  if (found) {
    res.json({
      msg: "member deleted",
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res
      .status(400)
      .json({ msg: `no member found with id of ${req.params.id}` });
  }
});

module.exports = route;
