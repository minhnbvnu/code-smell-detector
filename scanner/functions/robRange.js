function robRange(nums,start,end){
  if(end===start){
    return nums[start]
  }
  const dp = new Array(nums.length).fill(0)
  dp[start] = nums[start]
  dp[start+1] = Math.max(nums[start],nums[start+1])
  for(let i=start+2;i<=end;i++){
    dp[i] = Math.max(dp[i-2]+nums[i],dp[i-1])
  }
  return dp[end]
}