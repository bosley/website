document.addEventListener('DOMContentLoaded', () => {
    const loremIpsum = `Terminal initialized...

> Loading profile data...
> Access granted...

Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed do eiusmod tempor incididunt ut labore et dolore 
magna aliqua. Ut enim ad minim veniam, quis nostrud 
exercitation ullamco laboris nisi ut aliquip ex ea 
commodo consequat.`;

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
