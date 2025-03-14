export function scheduleMessageDeletion(bot, chatId, messageId, delayInMinutes) {
    setTimeout(async () => {
        try {
            await bot.app.telegram.deleteMessage(chatId, messageId);
            console.log("Message deleted successfully.");
        }
        catch (error) {
            console.error("Error deleting message:", error);
        }
    }, delayInMinutes * 60 * 1000);
}
