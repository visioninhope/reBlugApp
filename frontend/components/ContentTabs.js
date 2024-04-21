import { useState } from "react";
import { Tabs, Tab, Card, CardBody, Switch } from "@nextui-org/react";
import AllActiveComponent from "./ActivityCover";
import MarketingTab from "./MarketingTab";
import BlogsTab from "./BlogsTab";


export default function ContentTabs() {
    const [isVertical, setIsVertical] = useState(false);
    const [allActivities, setAllActivities] = useState(true);
    const [allMarketing, setAllMarketing] = useState(true);
    const [allBlogs, setAllBlogs] = useState(true);
    const [noActivity, setNoActivity] = useState(null);


    return (
        <div className="flex flex-col px-2">
            <Switch className="mb-4 hidden" isSelected={isVertical} onValueChange={() => setIsVertical(!isVertical)}>
                Vertical
            </Switch>
            <div className="flex w-full flex-col overflow-auto">
                <Tabs aria-label="Options" isVertical={isVertical}>
                    <Tab key="all" title="All Activities">
                        <Card>
                            <CardBody>
                                <AllActiveComponent />
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="email" title="Marketing">
                        <Card>
                            {allMarketing ? (
                                <CardBody>
                                    <MarketingTab />
                                </CardBody>
                            ) : (
                                <CardBody>
                                    You have no activity
                                </CardBody>
                            )}
                        </Card>
                    </Tab>
                    <Tab key="blogs" title="Blogging">
                        <Card>
                            {allBlogs ? (
                                <CardBody>
                                    "All"
                                </CardBody>
                            ) : (
                                <CardBody>
                                    You have no activity
                                </CardBody>
                            )}
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}