
export const formatWithZeros = (num,num_of_zeros) => {
  var res = Number(num)+'';
  while(res.length<num_of_zeros){
    res='0'+res;
  }
  return res;
}
