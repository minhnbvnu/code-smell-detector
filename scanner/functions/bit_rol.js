function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}