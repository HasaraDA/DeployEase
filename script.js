document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("awsForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const instanceName = document.getElementById("instance_name").value.trim();
        const image = document.getElementById("image").value;
        const instanceType = document.getElementById("instance_type").value;
        const keypair = document.getElementById("keypair").value;
        const region = document.getElementById("region").value;
        const securityGroupId = document.getElementById("security_group_id").value;
        const vpcId = document.getElementById("vpc_id").value;
        const subnetId = document.getElementById("subnet_id").value;

        // Validate required fields
        if (!instanceName || !image || !instanceType || !keypair || !region || !securityGroupId || !vpcId || !subnetId) {
            alert("Please fill in all fields.");
            return;
        }

        // Create the YAML configuration
        const yamlConfig = `
instance_name: "${instanceName}"
image: "${image}"
instance_type: "${instanceType}"
keypair: "${keypair}"
region: "${region}"
security_group_id: "${securityGroupId}"
vpc_id: "${vpcId}"
subnet_id: "${subnetId}"
        `;

        // Display the YAML configuration in an alert
        alert("Configuration for instance submitted successfully:\n\n" + yamlConfig);
    });
});
