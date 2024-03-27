export default class HomeController {
  welcome(_, res) {
    return res.status(200).json({
      success: true,
      message: "Welcome Edge Bound API",
      data: null,
    });
  }
}
