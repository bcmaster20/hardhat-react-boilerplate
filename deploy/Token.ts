module.exports = async ({
  getNamedAccounts,
  deployments,
  getChainId,
  getUnnamedAccounts,
}) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("Token", {
    from: deployer,
    // gas: 4000000,
    args: ["MKVToken", "MKV", 10000000],
  });
};
