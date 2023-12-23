Explanation of figure 9 and 10: calFactorial(3) is called with num equal to 3 and starts a frame on the stack for the calFactorial function with num as 3. 
In this frame, the function checks if num is greater than 0. Since num is 3, the function  calls calFactorial(2). 
Next, another frame for calFactorial(2) is created on the stack with num as 2. 
The calFactorial(2) function also checks if num is greater than 0. Since num is 2, the function calls calFactorial(1). 
Another frame for calFactorial(1) is created on the stack with num as 1. 
The calFactorial(1) function also checks if num is greater than 0. Since num is 1, the function enters the else block and does not make any further recursive calls and reaches the base case. It returns 1. 
The result from calFactorial(1) (which is 1) is computed, and the frame of calFactorial(1) is removed from the stack. 
Back to the frame of calFactorial(2) with the result from step 7 (which is 1), it calculates 2 * 1 = 2, and the frame of calFactorial(2) is also removed from the stack. 
Returning to the frame of calFactorial(3) with the result from step 8 (which is 3), it calculates 3 * 2 = 6. 
Finally, the frame of calFactorial(3) is also removed from the stack, and the final result is 6. 
During this process, each recursive call creates a new frame on the stack, and when it reaches the base case, the frames are removed from the stack in a Last-In-First-Out (LIFO) manner.
