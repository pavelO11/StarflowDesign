const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

if (!token || !chatId) {
  throw new Error('Telegram credentials are missing');
}

const baseUrl = `https://api.telegram.org/bot${token}`;

export const sendMessage = async (message: string): Promise<void> => {
  const url = `${baseUrl}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
  const response = await fetch(url);

  if (!response.ok) {
    const error = await response.json();
    return Promise.reject(error.description || 'Error');
  }

  console.log('response', await response.json());
};
