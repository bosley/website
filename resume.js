document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('typed-content');
    
    // Convert your resume content to a structured format
    const resumeData = `> Initializing resume data...
> Access granted...

# Employment

[San Luis Aviation] Linux Engineer (Remote)
May 2022 - Current
• C/C++ Backend development on real time chat services infrastructure
• Designed static-memory metrics library using modern C++
• APNS mock server for platform testing
• Develop/Maintain in-house signaling protocol libraries
• Updating large C++ code base to modern standards and techniques

[Circonus] Systems Engineer (Remote)
Nov 2021 - May 2022
• C/C++ Backend development on distributed time-series database IRONdb
• Using GoogleTest and Busted (Lua) for unit and integration testing
• Development on custom DSL Circonus Analytic Query Language (CAQL)
• Deployment of software to dev and prod clusters on EL7 and Ubuntu

[DCS/US Army] Computer Engineer II
June 2018 - Nov 2021
• Embedded real-time systems development on military vehicles
• Implemented GPS-153D specification for DAGR device (C++11)
• Vehicle N-Battery battery management software
• Custom Wireshark protocol analyzers (Lua)

# Education

[LSSU] Computer Science B.S
2013-2018
• Graduated with department GPA of >3.0 while working full time

# Tools

QT, C11, C++11, C++17, C++20, GoLang, Python, LUA, GDB, LLDB, Make, CMake, docker, linux, windows, macos`;

    let lines = resumeData.split('\n');
    let currentLine = 0;
    
    function typeNextLine() {
        if (currentLine < lines.length) {
            let line = lines[currentLine];
            
            // Format the line based on its content
            let formattedLine = '';
            if (line.startsWith('#')) {
                formattedLine = `<h2 class="section-header">${line.substring(2)}</h2>`;
            } else if (line.startsWith('[')) {
                formattedLine = `<div class="job-entry">${line.replace(/\[(.*?)\]/, '<strong>$1</strong>')}</div>`;
            } else if (line.startsWith('•')) {
                formattedLine = `<div class="job-entry">    ${line}</div>`;
            } else if (line.startsWith('>')) {
                formattedLine = `<div class="terminal-command">${line}</div>`;
            } else {
                formattedLine = `<div class="job-entry">${line}</div>`;
            }
            
            content.innerHTML += formattedLine;
            currentLine++;
            
            // Super fast typing effect
            setTimeout(typeNextLine, Math.random() * 10 + 5);
        }
    }

    // Start typing effect
    setTimeout(typeNextLine, 500);
});
