function isa(tool, type) {
                const is = (tool instanceof tool_proxy_1.ToolProxy ? tool.underlying : tool) instanceof type;
                if (is) {
                    visited.add(tool);
                }
                return is;
            }