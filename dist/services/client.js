"use strict";
// import { Api, TelegramClient } from "telegram/index.js";
// import { StringSession } from "telegram/sessions/index.js";
// import env from "../services/env.js";
// import { delay } from "../extra/delay.js";
// const apiId = env.apiId;
// const apiHash = env.hashId;
// const stringSession = env.sessionId;
// export const client = new TelegramClient(new StringSession(stringSession), apiId!, apiHash!, {
//   connectionRetries: 3,
// });
// export async function getMessageFromId(chat: any, messageId: any) {
//   await client.connect();
//   const source = await client.getInputEntity(parseInt(chat));
//   const message = await client.getMessages(source, { ids: [messageId] });
//   return message;
// }
// export async function getAllMessages(chat: number, oId: number) {
//   try {
//     await client.connect();
//     const source = await client.getInputEntity(chat);
//     let offsetId = oId;
//     const messages = await client.getMessages(source, {
//       limit: 5000,
//       offsetId: offsetId,
//       reverse: true,
//     });
//     await client.disconnect();
//     return messages;
//   } catch (error) {
//     console.error("Error getting all message IDs:", error);
//     throw error;
//   }
// }
// export async function createChannelsAndInviteAsAdmin(
//   title: string,
//   about: string,
//   usernames: string[],
//   numberOfChannelToCreate: number
// ): Promise<string[]> {
//   const channelIds: string[] = [];
//   if (numberOfChannelToCreate > 50) {
//     return ["you can't create more than 50 channels"];
//   }
//   try {
//     await client.connect();
//     for (let i = 0; i < numberOfChannelToCreate; i++) {
//       const channelTitle = `${title} ${i + 1}`;
//       const createChannelResult = (await client.invoke(
//         new Api.channels.CreateChannel({
//           title: channelTitle,
//           about: about,
//         })
//       )) as Api.Updates;
//       console.log(`Channel ${i + 1} created:`, createChannelResult);
//       const channel = createChannelResult.chats[0];
//       const channelId = `-100${channel.id.toString()}`;
//       console.log(`Channel ID ${i + 1}:`, channelId);
//       channelIds.push(channelId);
//       for (const username of usernames) {
//         const result = await client.invoke(
//           new Api.channels.EditAdmin({
//             channel: channelId,
//             userId: username,
//             adminRights: new Api.ChatAdminRights({
//               changeInfo: true,
//               postMessages: true,
//               editMessages: true,
//               deleteMessages: true,
//               banUsers: true,
//               inviteUsers: true,
//               pinMessages: true,
//               addAdmins: true,
//               anonymous: true,
//               manageCall: true,
//               other: true,
//             }),
//             rank: "Admin",
//           })
//         );
//         console.log(`User ${username} granted admin rights in Channel ${i + 1}:`, result);
//         await delay(10000, 30000);
//       }
//     }
//   } catch (error) {
//     console.error("Error occurred:", error);
//   } finally {
//     await client.disconnect();
//   }
//   return channelIds;
// }
// export async function deleteMessagesInBatches(
//   channel: number,
//   messageIds: number[]
// ): Promise<void> {
//   await client.connect();
//   const channelEntity = await client.getInputEntity(channel);
//   const batchSize = 50;
//   for (let i = 0; i < messageIds.length; i += batchSize) {
//     const batch = messageIds.slice(i, i + batchSize);
//     try {
//       console.log(`Deleting messages: ${batch}`);
//       // await client.invoke(
//       //   new Api.channels.DeleteMessages({
//       //     channel: channelEntity,
//       //     id: batch,
//       //   })
//       // );
//       await client.deleteMessages(channelEntity, batch, { revoke: true });
//       console.log(`Deleted messages: ${batch}`);
//     } catch (error) {
//       console.error(`Error deleting batch ${batch}:`, error);
//       await new Promise((resolve) => setTimeout(resolve, 40000));
//     }
//     await delay(10000, 30000);
//   }
//   await client.disconnect();
// }
