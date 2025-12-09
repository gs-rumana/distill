export const StartMessages = [
	'Do one thing only. Everything else can wait.',
	'Your brain works best when you protect it from interruptions.',
	'Work with intention, not pressure. One block at a time.',
	'Progress beats perfection. Just move forward.',
	'Close what doesn’t matter. Focus on what does.',
	'If your mind wanders, notice it, then return. That’s focus training.',
	'The next few minutes decide the rest of your day.',
	'The hardest part is to begin, momentum will take care of the rest.',
	'Close unused tabs and apps before starting.',
	'Define a single clear outcome for this session.',
	'If you get stuck, break the task into the next smallest step.',
	'Keep all ideas or distractions in a quick notes list instead of switching tasks.',
	'Work in silence - no music with lyrics if focus matters.',
	'Disable notifications for the next %time% minutes.',
	'Keep water nearby so you don’t break focus later.',
	"Don't be hard on yourself, pick a comfortable time and gradually increase it.",
];

export const CompletedMessages = [
	'Good work. Take a short break; you earned it.',
	'Solid progress. Breathe, reset, then decide your next move.',
	'That session counts. Consistency builds results.',
	'Small win logged. These add up quickly.',
	'Good session. Reward yourself with a short stretch or walk.',
	'You stayed focused. That’s a skill getting sharper each time.',
	'Progress recorded. Take a break and reset your attention.',
	'Log what you accomplished before moving on.',
	'Stand up and stretch for some time.',
	'Review your task list: continue, adjust, or mark done.',
	'Take a short break, avoid screens if possible.',
	'Drink water. Small reset helps next session.',
	'Don’t jump into notifications yet. Keep momentum.',
	'If you lost focus during the session, write why. Learn and improve.',
	'Take a short break, it will reset your focus for the next session.',
];

export const getRandomStartMessage = () => {
	const index = Math.floor(Math.random() * StartMessages.length);
	return StartMessages[index];
};

export const getRandomCompletedMessage = () => {
	const index = Math.floor(Math.random() * CompletedMessages.length);
	return CompletedMessages[index];
};
