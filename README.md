# gpt2_tweets

This GPT2-tweets API generates celebrities style tweets text.  
When you enter text at the beginning of the tweets, the model gives you the rest of the tweets as long as you want.  

## How to use

For use This API, you need to check 4 parameters.

**# POST parameter**

***/gpt2-tweets***  
model : Choose the tweet model of the celebrity you want to generate.
text : Begining of the text you want to generate  
number_samples : The number of sentence that will be generated  
length : The length of each sentence  

**# With CLI** :  

curl --location --request POST 'https://main-gpt2-tweets-gmlee329.endpoint.ainize.ai/gpt2-tweets' --form 'model=dualipa' --form 'text=My dream is' --form 'num_samples=1' --form 'length=10'

**# With swagger** : 

You can test this API with swagger.yaml on [swagger editor](https://editor.swagger.io/)