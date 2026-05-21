let ioInstance;

const setIO = (io) => {
    ioInstance = io;
};

const sendNotification = (data) => {

    if (ioInstance) {
        ioInstance.emit("notification", data);
    }

};

module.exports = { setIO, sendNotification };