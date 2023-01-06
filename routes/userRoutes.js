const bcrypt = require("bcrypt");
const user = require("../model/userModel");
const jwt = require('jsonwebtoken')

function generateAccessToken(username) {
  return jwt.sign(username, process.env.JWT_SECRET, { expiresIn: '2h' });
}

exports.register = async (req, res) => {
  const { name, username } = req.body;
  let findUser = await user.findOne({username: username});
	if(findUser){
		let msg = "User Already Exist. Please Login";
		return res.render("../views/pages/register.ejs", { errMsg: msg } )
	}else{
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		const token = generateAccessToken({ username: username });
		const newUser = new user({
		  username: username,
		  name: name,
		  password: hashedPassword,
		  token : token,
		});
		try {
		  await newUser.save();
		  res.cookie("token", token, { maxAge: 300 * 1000 }).redirect("/dashboard")
		} catch (error) {
		  console.log(error);
		}
	}
};

exports.login = async (req, res) => {
  const {username} = req.body;
  try {
	let findUser = await user.findOne({username: username});
	if(!findUser){
		// return res.send("Invalid User")
		let msg = "Invalid User";
		return res.render("../views/pages/login.ejs", { errMsg: msg } )
	}else{
		let validPassword = await bcrypt.compare(req.body.password,findUser.password);
		if(!validPassword){
			let msg = "Invalid Password";
			return res.render("../views/pages/login.ejs", { errMsg: msg })
		}else{
			const token = generateAccessToken({ username: username })
			user.token = token
			res.cookie("token", token, { maxAge: 300 * 1000 }).redirect("/dashboard")
		}
	}
  } catch (error) {
	// res.send(error);
	console.log(error);
  }
};
