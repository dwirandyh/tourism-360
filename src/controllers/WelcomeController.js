class WelcomeController {
  static async index(req, res) {
    return res.json({ msg: "Welcome" });
  }
}

export default WelcomeController;
