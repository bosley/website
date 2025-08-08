document.addEventListener('DOMContentLoaded', () => {
    const loremIpsum = `Terminal initialized...

> Loading profile data...
> Access granted...

I don't much care for describing myself so I fed my resume into an AI
model and asked it to describe me to a potential employer.

This is the "tldr" it generated from its first response:

Experienced C/C++ engineer specializing in real-time, mission-critical 
systems with a strong track record in backend development and embedded systems.
Currently at San Luis Aviation, developing chat services for emergency 
and medical use, and previously worked on distributed systems and custom DSLs.
Proficient in C/C++, Python, and Go, with solid skills in project management and 
leadership. Ready to bring my expertise and passion for software development to new,
challenging opportunities. 
`;

    const typedTextElement = document.getElementById('typed-text');
    let currentChar = 0;
    
    function typeText() {
        if (currentChar < loremIpsum.length) {
            // Format the text with proper line breaks and spacing
            const formattedText = loremIpsum.slice(0, currentChar + 1)
                .split('\n')
                .map(line => line.trim())
                .join('<br>')
                .replace(/ /g, '&nbsp;');
            
            typedTextElement.innerHTML = formattedText;
            currentChar++;
            
            // Reduced delay range for faster typing
            const randomDelay = Math.random() * 20 + 10;
            setTimeout(typeText, randomDelay);
        }
    }

    // Add event listeners for navigation icons
    const icons = document.querySelectorAll('.nav-icon');
    icons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            const section = e.currentTarget.id.split('-')[0];
            // TODO: Implement navigation logic
            console.log(`Navigating to ${section}`);
        });
    });

    // Start typing effect
    setTimeout(typeText, 1000);
});
