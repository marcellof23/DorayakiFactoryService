import path from "path";
import YAML from "yamljs";

const swaggerDocs = YAML.load(
	path.resolve(process.cwd() + "/documentation/swagger.yaml")
);

export default swaggerDocs;
