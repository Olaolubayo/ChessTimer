            const minutes1 = document.querySelector('.min1');            
            const minutes2 = document.querySelector('.min2');            
            const startBtn = document.getElementById('start');            
            const switchBtn = document.getElementById('switch');            
            const resetBtn = document.getElementById('reset');            
            const player1Div = document.getElementById('player-1');
            const player2Div = document.getElementById('player-2');
            const beep = document.getElementById('beep-sound');

            let playerTime1 = 600;
            let playerTime2 = 600;
            let currentPlayer = 1;            
            let timer;            
            let isPlaying = false;

            function display(time,timerElement) {
                let minute = Math.floor(time/60);            
                let seconds = time % 60;
                let formattedTime = `${minute.toString().padStart(2,'0')}: ${seconds.toString().padStart(2,'0')}`; 
                if(time < 60) {
                    timerElement.classList.add('low-time');
                    beep.play();
                }else {
                    timerElement.classList.remove('low-time');
                }

                return formattedTime;
            }                        

            function updatePlayer() {
                minutes1.innerHTML = display(playerTime1,minutes1)                
                minutes2.innerHTML = display(playerTime2,minutes2);
            }
            
            startBtn.addEventListener('click',()=> {
                if(!isPlaying) {
                    isPlaying = true;
                    timer = setInterval(() => {
                            if(currentPlayer === 1) {
                                if(playerTime1 > 0) {
                                playerTime1---
                                console.log('player 1',playerTime1);
                                updatePlayer();
                            }else {
                                alert(`Game over! Player ${currentPlayer === 1 ? 2: 1} won the game`);                                
                                console.log('currentplayer',currentPlayer);
                                resetFn();
                                return                                
                            }

                        } else if (currentPlayer === 2) {
                            if(playerTime2 > 0) {                            
                            playerTime2---
                            console.log('player2',playerTime2)
                            updatePlayer();
                        } else {
                            alert(`Game over! Player ${currentPlayer === 2 ? 1 : 2} won the game`);
                            resetFn();
                            return
                        }

                        }
                          
                    }, 1000);
                }
                if(currentPlayer === 1) {
                    minutes1.classList.add('active');
                    minutes2.classList.remove('active');
                    player1Div.classList.add('active-panel');
                    player2Div.classList.remove('active-panel');
                } else {
                    minutes2.classList.add('active');
                    minutes1.classList.remove('active');
                    player2Div.classList.add('active-panel');
                    player1Div.classList.remove('active-panel')                    
                }

                console.log('isplaying',isPlaying)
            })

            switchBtn.addEventListener('click',()=> {
                if(!isPlaying) {
                    return
                } else {
                    currentPlayer = currentPlayer === 1 ? 2 : 1; 
                }                
                if(currentPlayer === 1) {
                    minutes1.classList.add('active');
                    minutes2.classList.remove('active');
                    player2Div.classList.remove('active-panel')   
                    player1Div.classList.add('active-panel');                                     
                } else {
                    minutes2.classList.add('active');
                    minutes1.classList.remove('active');                    
                    player1Div.classList.remove('active-panel')                    
                    player2Div.classList.add('active-panel');
                }
            })

            function resetFn() {
                isPlaying = false;
                clearInterval(timer);
                playerTime1 = 600;
                playerTime2 = 600;
                updatePlayer()
                currentPlayer = 1;
                minutes1.classList.remove('active');
                minutes2.classList.remove('active');
                player1Div.classList.remove('active-panel')  
                player2Div.classList.remove('active-panel')  
            }

            resetBtn.addEventListener('click',resetFn)