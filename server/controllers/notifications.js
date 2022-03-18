const errorHandler = require("../utils/error-handler");
const webpush = require("web-push");

module.exports.notifications = async (req, res) => {
  try {
    let sub = req.body;
    res.set("Content-Type", "application/json");
    webpush.setVapidDetails(
      "mailto:example@yourdomain.org",
      "BBRVQ_0ZBnsZTJ5eQezUyf5z1eW2AZqLfR73wYSqU1VBUYI3yhi1f24aAwLRpzvzNqcoz5pCCRiwTQj7APZqqZg",
      "d4HVHMOVL3EhqzPIawb-9X4Nc6yQIhbzv8mPO_Ohspw"
    );

    let payload = JSON.stringify({
      notification: {
        title: "libApp",
        body: "Thanks for subscribing",
        icon: "https://yt3.ggpht.com/a-/AAuE7mCxr-4W53FAxBRcKR0iDk_vPCSAmW-QKFGaFA=s88-mo-c-c0xffffffff-rj-k-no",
      },
    });

    Promise.resolve(webpush.sendNotification(sub, payload))
      .then(() =>
        res.status(200).json({
          message: "Notification sent",
        })
      )
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } catch (e) {
    errorHandler(res, e);
  }
};
