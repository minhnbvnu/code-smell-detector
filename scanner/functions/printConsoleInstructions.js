function printConsoleInstructions() {
    console.log(`
     _____  __                       _                 
    / ___/ / /_ _____ ____ _ ____   (_)                
    \\__ \\ / __// ___// __ \`// __ \\ / /                 
   ___/ // /_ / /   / /_/ // /_/ // /                  
  /____/ \\__//_/    \\__,_// .___//_/                   
                         /_/                           
      ____                      __                  __ 
     / __ ) _____ ___   ____ _ / /__ ____   __  __ / /_
    / __  |/ ___// _ \\ / __ \`// //_// __ \\ / / / // __/
   / /_/ // /   /  __// /_/ // ,<  / /_/ // /_/ // /_  
  /_____//_/    \\___/ \\__,_//_/|_| \\____/ \\__,_/ \\__/ 
    
---------------------------------------------------
|  Welcome to the Strapi Breakout Game!                              
|  Made with ♥ by https://github.com/cpaczek                                    

|  Use the Arrow/AD keys or Mouse to move the paddle.         
|  Press Enter to start the game.                             
|  Press Escape to exit the game.                             
---------------------------------------------------
|  Secret Menu:                                                
|    Press P to toggle rendering (i.e pause the game).          
|    Change the speed by typing in the console: ball.speed = 15 
|    Exported Game Objects:
|      - ball
|      - bar
|      - game
|      - Particle (Class)
|      - Firework (Class)
|      - Game (Class)
|      - Bar (Class)
|      - Ball (Class)
---------------------------------------------------
    `);
  }