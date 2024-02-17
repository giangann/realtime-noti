import { wsServerGlob } from "../index";

const sendNotiToUser = async (to_user_id: number, message: any) => {
  const clients = await wsServerGlob.fetchSockets();
  clients.forEach((client) => {
    if (client.data.user.id === to_user_id) {
      client.emit("new-noti", message);
    }
  });
};

export default { sendNotiToUser };
